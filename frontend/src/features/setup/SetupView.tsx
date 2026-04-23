import {
    Box, Heading, Text, VStack, Button, Switch, FormControl,
    FormLabel, Divider, Badge, useToast, Icon, Flex, Card, CardBody
} from '@chakra-ui/react'
import { Mail, BrainCircuit, ShieldCheck, ExternalLink, CheckCircle2 } from 'lucide-react'
import { useSearchParams } from 'react-router-dom'

const SetupView = () => {
    const toast = useToast()
    const [searchParams] = useSearchParams()

    // Check if the URL has ?connected=true (passed by backend after login)
    const isConnected = searchParams.get('connected') === 'true'

    const handleConnectGmail = async () => {
        try {
            // 1. Fetch the secure Auth URL from your FastAPI backend
            const response = await fetch('http://localhost:8000/api/v1/auth/url')
            const data = await response.json()

            if (data.url) {
                // 2. Redirect the user to the Google Login screen
                window.location.href = data.url
            } else {
                throw new Error("No URL returned from backend")
            }
        } catch (error) {
            toast({
                title: "Connection Failed",
                description: "Could not reach the authentication server. Ensure backend is running.",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "top-right",
            })
        }
    }

    return (
        <Box>
            <Box mb={6}>
                <Heading size="lg" letterSpacing="tight">System Configuration</Heading>
                <Text color="gray.500" fontSize="sm">Connect your data sources and prime the AI Agent.</Text>
            </Box>

            <VStack spacing={6} align="stretch" maxW="4xl">

                {/* EMAIL INGESTION SECTION */}
                <Card
                    variant="outline"
                    borderRadius="2xl"
                    borderColor={isConnected ? "emerald.200" : "gray.200"}
                    bg={isConnected ? "emerald.50/30" : "white"}
                    shadow="sm"
                >
                    <CardBody p={8}>
                        <Flex justify="space-between" align="flex-start" mb={6}>
                            <Box>
                                <Flex align="center" gap={3} mb={1}>
                                    <Icon as={Mail} color={isConnected ? "emerald.500" : "indigo.500"} boxSize={5} />
                                    <Heading size="md">Email Ingestion</Heading>
                                </Flex>
                                <Text fontSize="sm" color="gray.500">
                                    {isConnected ? "Ingesting orders from connected account." : "Auto-scrape orders from Blinkit, Zepto, and Shopify."}
                                </Text>
                            </Box>
                            <Badge
                                colorScheme={isConnected ? "emerald" : "gray"}
                                variant="subtle"
                                px={3}
                                py={1}
                                borderRadius="lg"
                            >
                                {isConnected ? "Connected" : "Not Connected"}
                            </Badge>
                        </Flex>

                        {isConnected ? (
                            <Button
                                leftIcon={<CheckCircle2 size={18} />}
                                variant="outline"
                                colorScheme="emerald"
                                size="lg"
                                width="full"
                                borderRadius="xl"
                                isDisabled
                            >
                                Account Connected
                            </Button>
                        ) : (
                            <Button
                                leftIcon={<ExternalLink size={18} />}
                                colorScheme="indigo"
                                size="lg"
                                width="full"
                                borderRadius="xl"
                                onClick={handleConnectGmail}
                            >
                                Connect Gmail Account
                            </Button>
                        )}
                        <Text fontSize="xs" color="gray.400" mt={4} textAlign="center">
                            Uses Google OAuth 2.0. We never see your password.
                        </Text>
                    </CardBody>
                </Card>

                {/* AI AGENT LOGIC SECTION */}
                <Card variant="outline" borderRadius="2xl" borderColor="gray.200" shadow="sm">
                    <CardBody p={8}>
                        <Flex align="center" gap={3} mb={6}>
                            <Icon as={BrainCircuit} color="purple.500" boxSize={5} />
                            <Heading size="md">AI Learning & Automation</Heading>
                        </Flex>

                        <VStack spacing={5} align="stretch">
                            <FormControl>
                                <Flex align="center" justify="space-between">
                                    <Box>
                                        <FormLabel mb="0" fontWeight="bold" fontSize="sm">Historical Ingestion</FormLabel>
                                        <Text fontSize="xs" color="gray.500">Analyze past orders to map logistics patterns.</Text>
                                    </Box>
                                    <Switch colorScheme="purple" size="lg" isDisabled={!isConnected} />
                                </Flex>
                            </FormControl>
                            <Divider borderColor="gray.100" />
                            <FormControl>
                                <Flex align="center" justify="space-between">
                                    <Box>
                                        <FormLabel mb="0" fontWeight="bold" fontSize="sm">Human-in-the-Loop</FormLabel>
                                        <Text fontSize="xs" color="gray.500">Draft emails for manual approval before sending.</Text>
                                    </Box>
                                    <Switch colorScheme="purple" size="lg" defaultChecked isDisabled={!isConnected} />
                                </Flex>
                            </FormControl>
                        </VStack>
                    </CardBody>
                </Card>

                {/* SECURITY FOOTER */}
                <Flex align="center" gap={2} px={2}>
                    <Icon as={ShieldCheck} color="emerald.500" boxSize={4} />
                    <Text fontSize="xs" color="gray.500">
                        Enterprise-grade OAuth security. Data processed for internal OMS logic only.
                    </Text>
                </Flex>

            </VStack>
        </Box>
    )
}

export default SetupView
