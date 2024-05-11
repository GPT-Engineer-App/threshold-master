import { useState } from "react";
import { Box, Button, Container, Flex, FormControl, FormLabel, Heading, Input, Select, Table, Tbody, Td, Th, Thead, Tr, useToast, VStack } from "@chakra-ui/react";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";

const Index = () => {
  const toast = useToast();
  const initialCategories = Array.from({ length: 11 }, (_, i) => ({
    id: i - 3,
    bottomThreshold: Math.floor(Math.random() * 1000),
    topThreshold: Math.floor(Math.random() * 1000 + 1000),
    portionSize: `size ${Math.floor(Math.random() * 6 + 1)}`,
    company: ["Adam Mattkasse", "Godlevert", "Linas"][Math.floor(Math.random() * 3)],
    salesPrice: Math.floor(Math.random() * 500 + 50),
  }));

  const [categories, setCategories] = useState(initialCategories);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    bottomThreshold: "",
    topThreshold: "",
    portionSize: "",
    company: "",
    salesPrice: "",
  });

  const handleEdit = (category) => {
    setEditingId(category.id);
    setFormData({
      bottomThreshold: category.bottomThreshold,
      topThreshold: category.topThreshold,
      portionSize: category.portionSize,
      company: category.company,
      salesPrice: category.salesPrice,
    });
  };

  const handleDelete = (id) => {
    setCategories(categories.filter((category) => category.id !== id));
    toast({
      title: "Category deleted",
      description: `Category ${id} has been removed.`,
      status: "error",
      duration: 3000,
      isClosable: true,
    });
  };

  const handleSave = () => {
    const updatedCategories = categories.map((category) => (category.id === editingId ? { ...category, ...formData } : category));
    setCategories(updatedCategories);
    setEditingId(null);
    toast({
      title: "Category updated",
      description: `Category ${editingId} has been updated.`,
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  const handleAdd = () => {
    const newCategory = {
      id: Math.min(...categories.map((c) => c.id)) - 1,
      ...formData,
    };
    setCategories([newCategory, ...categories]);
    toast({
      title: "Category added",
      description: `New category ${newCategory.id} has been added.`,
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Container maxW="container.xl">
      <VStack spacing={8} align="stretch">
        <Box p={5} shadow="md" borderWidth="1px">
          <Heading fontSize="xl">Manage Categories</Heading>
        </Box>
        <Box p={5} shadow="md" borderWidth="1px">
          <FormControl isRequired>
            <FormLabel htmlFor="bottomThreshold">Bottom Threshold</FormLabel>
            <Input id="bottomThreshold" name="bottomThreshold" value={formData.bottomThreshold} onChange={handleChange} />
          </FormControl>
          <FormControl isRequired mt={4}>
            <FormLabel htmlFor="topThreshold">Top Threshold</FormLabel>
            <Input id="topThreshold" name="topThreshold" value={formData.topThreshold} onChange={handleChange} />
          </FormControl>
          <FormControl isRequired mt={4}>
            <FormLabel htmlFor="portionSize">Portion Size</FormLabel>
            <Select id="portionSize" name="portionSize" value={formData.portionSize} onChange={handleChange}>
              {Array.from({ length: 6 }, (_, i) => `size ${i + 1}`).map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </Select>
          </FormControl>
          <FormControl isRequired mt={4}>
            <FormLabel htmlFor="company">Company</FormLabel>
            <Select id="company" name="company" value={formData.company} onChange={handleChange}>
              <option value="Adam Mattkasse">Adam Mattkasse</option>
              <option value="Godlevert">Godlevert</option>
              <option value="Linas">Linas</option>
            </Select>
          </FormControl>
          <FormControl isRequired mt={4}>
            <FormLabel htmlFor="salesPrice">Sales Price</FormLabel>
            <Input id="salesPrice" name="salesPrice" value={formData.salesPrice} onChange={handleChange} />
          </FormControl>
          <Flex mt={4}>
            <Button leftIcon={<FaPlus />} colorScheme="blue" onClick={editingId === null ? handleAdd : handleSave}>
              {editingId === null ? "Add Category" : "Save Changes"}
            </Button>
          </Flex>
        </Box>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>ID</Th>
              <Th>Bottom Threshold</Th>
              <Th>Top Threshold</Th>
              <Th>Portion Size</Th>
              <Th>Company</Th>
              <Th>Sales Price</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {categories.map((category) => (
              <Tr key={category.id}>
                <Td>{category.id}</Td>
                <Td>{category.bottomThreshold}</Td>
                <Td>{category.topThreshold}</Td>
                <Td>{category.portionSize}</Td>
                <Td>{category.company}</Td>
                <Td>{category.salesPrice}</Td>
                <Td>
                  <Button size="sm" leftIcon={<FaEdit />} colorScheme="blue" onClick={() => handleEdit(category)}>
                    Edit
                  </Button>
                  <Button size="sm" leftIcon={<FaTrash />} colorScheme="red" ml={2} onClick={() => handleDelete(category.id)}>
                    Delete
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </VStack>
    </Container>
  );
};

export default Index;
