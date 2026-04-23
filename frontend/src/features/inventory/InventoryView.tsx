import { Box, Table, Thead, Tbody, Tr, Th, Td, Badge, Heading, Text, Flex, Button } from '@chakra-ui/react';
import { useSelector, useDispatch } from 'react-redux';
import { Plus } from 'lucide-react';
import type { RootState, AppDispatch } from '../../store';
import { incrementStock } from './inventorySlice';
import AddItemModal from './AddItemModal'; // Import the new component

const InventoryView = () => {
    const inventory = useSelector((state: RootState) => state.inventory.items);
    const dispatch = useDispatch<AppDispatch>();

    return (
        <Box>
            <Flex justify="space-between" align="flex-end" mb={6}>
                <Box>
                    <Heading size="lg" letterSpacing="tight">Warehouse Ground Truth</Heading>
                    <Text color="gray.500" fontSize="sm">Direct stock management for the AI agentic layer.</Text>
                </Box>
                {/* Render the separate Modal component here */}
                <AddItemModal />
            </Flex>

            <Box bg="white" shadow="sm" border="1px solid" borderColor="gray.200" borderRadius="2xl" overflow="hidden">
                <Table variant="simple">
                    <Thead bg="gray.50">
                        <Tr>
                            <Th py={5} color="gray.600">Item Details</Th>
                            <Th py={5} color="gray.600">SKU ID</Th>
                            <Th py={5} textAlign="center" color="gray.600">Stock Level</Th>
                            <Th py={5} textAlign="right" color="gray.600">Actions</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {inventory.map((item) => (
                            <Tr key={item.id} _hover={{ bg: 'gray.50' }} transition="background 0.2s">
                                <Td fontWeight="bold" color="slate.800">{item.name}</Td>
                                <Td color="gray.500" fontFamily="mono" fontSize="xs">{item.sku}</Td>
                                <Td textAlign="center">
                                    <Badge colorScheme={item.quantity < 10 ? 'orange' : 'green'} borderRadius="full" px={3} variant="subtle">
                                        {item.quantity} Units
                                    </Badge>
                                </Td>
                                <Td textAlign="right">
                                    <Button size="sm" variant="ghost" onClick={() => dispatch(incrementStock(item.id))} color="indigo.600">
                                        <Plus size={18} />
                                    </Button>
                                </Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </Box>
        </Box>
    );
};

export default InventoryView;
