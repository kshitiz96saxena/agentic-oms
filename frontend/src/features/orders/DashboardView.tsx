import { Box, SimpleGrid, Stat, StatLabel, StatNumber, StatHelpText, Heading, Text, Flex, Icon, Badge } from '@chakra-ui/react'
import { useSelector } from 'react-redux'
import type { RootState } from '../../store'
import { Mail, TrendingUp, AlertCircle, CheckCircle2, ChevronRight } from 'lucide-react'

const DashboardView = () => {
    const orders = useSelector((state: RootState) => state.orders.orders)

    return (
        <Box maxW="6xl" mx="auto">
            <Box mb={6}>
                <Heading size="lg" letterSpacing="tight">Executive Dashboard</Heading>
                <Text color="gray.500" mt={1}>Aggregated order flow from connected channels.</Text>
            </Box>

            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6} mb={12}>
                <Box bg="white" p={6} borderRadius="2xl" border="1px solid" borderColor="gray.200" shadow="sm">
                    <Stat>
                        <Flex justify="space-between" align="center" mb={2}>
                            <StatLabel fontSize="xs" fontWeight="bold" color="gray.400">TOTAL VOLUME</StatLabel>
                            <Icon as={TrendingUp} color="indigo.500" boxSize={5} />
                        </Flex>
                        <StatNumber fontSize="3xl" fontWeight="bold">{orders.length}</StatNumber>
                        <StatHelpText>All channels</StatHelpText>
                    </Stat>
                </Box>

                <Box bg="white" p={6} borderRadius="2xl" border="1px solid" borderColor="gray.200" shadow="sm">
                    <Stat>
                        <Flex justify="space-between" align="center" mb={2}>
                            <StatLabel fontSize="xs" fontWeight="bold" color="gray.400">PENDING</StatLabel>
                            <Icon as={AlertCircle} color="orange.400" boxSize={5} />
                        </Flex>
                        <StatNumber fontSize="3xl" fontWeight="bold">
                            {orders.filter(o => o.status === 'Incoming').length}
                        </StatNumber>
                        <StatHelpText>Needs approval</StatHelpText>
                    </Stat>
                </Box>

                <Box bg="white" p={6} borderRadius="2xl" border="1px solid" borderColor="gray.200" shadow="sm">
                    <Stat>
                        <Flex justify="space-between" align="center" mb={2}>
                            <StatLabel fontSize="xs" fontWeight="bold" color="gray.400">DISPATCHED</StatLabel>
                            <Icon as={CheckCircle2} color="emerald.500" boxSize={5} />
                        </Flex>
                        <StatNumber fontSize="3xl" fontWeight="bold">
                            {orders.filter(o => o.status === 'Dispatched').length}
                        </StatNumber>
                        <StatHelpText>Inventory synced</StatHelpText>
                    </Stat>
                </Box>
            </SimpleGrid>

            <Box>
                {orders.map(order => (
                    <Flex
                        key={order.id}
                        bg="white"
                        p={6}
                        borderRadius="2xl"
                        border="1px solid"
                        borderColor="gray.200"
                        align="center"
                        justify="space-between"
                        mb={4}
                        _hover={{ borderColor: 'indigo.300', shadow: 'md' }}
                        cursor="pointer"
                    >
                        <Flex align="center" gap={5}>
                            <Box bg="indigo.50" p={4} borderRadius="xl" color="indigo.600">
                                <Mail size={24} />
                            </Box>
                            <Box>
                                <Flex align="center" gap={3}>
                                    <Text fontWeight="bold">{order.customer}</Text>
                                    <Badge variant="subtle" fontSize="10px">{order.provider}</Badge>
                                </Flex>
                                <Text fontSize="sm" color="gray.500">{order.items}</Text>
                            </Box>
                        </Flex>
                        <Box textAlign="right">
                            <Text fontSize="10px" fontWeight="bold" color="gray.400">{order.time}</Text>
                            <Text fontSize="sm" color="indigo.600" fontWeight="bold">{order.status}</Text>
                        </Box>
                    </Flex>
                ))}
            </Box>
        </Box>
    )
}

export default DashboardView
