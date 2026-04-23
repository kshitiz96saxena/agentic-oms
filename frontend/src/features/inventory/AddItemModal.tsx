import { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
    Button, Modal, ModalOverlay, ModalContent, ModalHeader,
    ModalFooter, ModalBody, ModalCloseButton, FormControl,
    FormLabel, Input, FormHelperText, Box, useDisclosure
} from '@chakra-ui/react';
import { Plus } from 'lucide-react';
import { addItem } from './inventorySlice';
import type { AppDispatch } from '../../store';

const AddItemModal = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const dispatch = useDispatch<AppDispatch>();
    const [formData, setFormData] = useState({ name: '', sku: '', qty: '' });

    // Validation Logic
    const isFormInvalid = !formData.name.trim() || !formData.sku.trim() || formData.qty === '';

    const handleSave = () => {
        if (isFormInvalid) return;

        dispatch(addItem({
            id: Date.now().toString(),
            name: formData.name,
            sku: formData.sku,
            quantity: Number(formData.qty) || 0
        }));

        setFormData({ name: '', sku: '', qty: '' });
        onClose();
    };

    return (
        <>
            <Button
                leftIcon={<Plus size={18} />}
                colorScheme="indigo"
                onClick={onOpen}
                px={6}
                borderRadius="xl"
                shadow="md"
            >
                Add Item
            </Button>

            <Modal isOpen={isOpen} onClose={onClose} isCentered motionPreset="slideInBottom">
                <ModalOverlay backdropFilter="blur(8px)" />
                <ModalContent borderRadius="2xl" p={2}>
                    <ModalHeader fontWeight="bold">New Warehouse Entry</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Box>
                            <FormControl mb={4} isRequired>
                                <FormLabel fontSize="sm" fontWeight="bold">Product Name</FormLabel>
                                <Input
                                    placeholder="e.g. iPhone 15 Pro"
                                    borderRadius="lg"
                                    focusBorderColor="indigo.500"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                />
                            </FormControl>
                            <FormControl mb={4} isRequired>
                                <FormLabel fontSize="sm" fontWeight="bold">SKU Code</FormLabel>
                                <Input
                                    placeholder="IPH-15P-256"
                                    borderRadius="lg"
                                    focusBorderColor="indigo.500"
                                    value={formData.sku}
                                    onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                                />
                            </FormControl>
                            <FormControl isRequired>
                                <FormLabel fontSize="sm" fontWeight="bold">Starting Quantity</FormLabel>
                                <Input
                                    type="number"
                                    placeholder="0"
                                    borderRadius="lg"
                                    focusBorderColor="indigo.500"
                                    value={formData.qty}
                                    onChange={(e) => setFormData({ ...formData, qty: e.target.value })}
                                />
                                {isFormInvalid && (
                                    <FormHelperText color="red.400" fontSize="xs">
                                        * All fields are mandatory to ground the AI model correctly.
                                    </FormHelperText>
                                )}
                            </FormControl>
                        </Box>
                    </ModalBody>
                    <ModalFooter gap={3}>
                        <Button variant="ghost" onClick={onClose} borderRadius="lg">Cancel</Button>
                        <Button
                            colorScheme="indigo"
                            px={8}
                            borderRadius="lg"
                            onClick={handleSave}
                            isDisabled={isFormInvalid}
                            _disabled={{ opacity: 0.5, cursor: 'not-allowed' }}
                        >
                            Add to Ground Truth
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export default AddItemModal;
