// Import Chakra UI components
import {
  Button,
  Box,
  Container,
  Heading,
  Input,
  useColorModeValue,
  VStack,
  useToast,
} from "@chakra-ui/react";
import React from "react";
import { useProductStore } from "../store/product";

const CreatePage = () => {
  // State management for new product form data
  const [newProduct, setNewProduct] = React.useState({
    name: "",
    price: "",
    image: "",
  });

  const toast = useToast();

  const { createProduct } = useProductStore();

  // Handler for Add Product button click
  const handleAddProduct = async () => {
    const { success, message } = await createProduct(newProduct);
    if (!success) {
      toast({
        title: "Error",
        description: message,
        status: "error",
        isClosable: true,
      })
    }
    else{
      toast({
        title: "Success",
        description: message,
        status: "success",
        isClosable: true,
      })
    };
    setNewProduct({ name: "", price: "", image: "" }); // Clear form fields after successful creation
  };

  return (
    <Container maxW={"container.sm"}>
      {" "}
      {/* Responsive container */}
      <VStack spacing={8}>
        {/* Page heading */}
        <Heading as={"h1"} size={"2xl"} textAlign={"center"} mb={8}>
          Create a New Product
        </Heading>
      </VStack>
      {/* Form container with theme-aware styling */}
      <Box
        w={"full"}
        bg={useColorModeValue("white", "gray.800")} // Light/dark mode background
        p={6}
        rounded={"lg"}
        shadow={"md"}
      >
        {/* Form elements stack */}
        <VStack spacing={4}>
          {/* Product Name Input */}
          <Input
            placeholder="Product Name"
            name="name"
            value={newProduct.name}
            onChange={(e) =>
              setNewProduct({ ...newProduct, name: e.target.value })
            }
          />

          {/* Product Price Input (number type) */}
          <Input
            placeholder="Product Price"
            type="number"
            name="price"
            value={newProduct.price}
            onChange={(e) =>
              setNewProduct({ ...newProduct, price: e.target.value })
            }
          />

          {/* Product Image URL Input */}
          <Input
            placeholder="Product Image URL"
            name="image"
            value={newProduct.image}
            onChange={(e) =>
              setNewProduct({ ...newProduct, image: e.target.value })
            }
          />

          {/* Submission Button */}
          <Button
            colorScheme="blue"
            onClick={handleAddProduct}
            w={"full"} // Full width button
          >
            Add Product
          </Button>
        </VStack>
      </Box>
    </Container>
  );
};

export default CreatePage;
