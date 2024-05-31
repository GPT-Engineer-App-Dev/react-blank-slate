import { useState } from "react";
import { Container, Heading, Button, VStack, HStack, Text, Box, Input, Textarea } from "@chakra-ui/react";
import { useVenues, useAddVenue, useUpdateVenue, useDeleteVenue } from "../integrations/supabase/index.js";

const Venues = () => {
  const { data: venues, isLoading, isError } = useVenues();
  const addVenue = useAddVenue();
  const updateVenue = useUpdateVenue();
  const deleteVenue = useDeleteVenue();

  const [newVenue, setNewVenue] = useState({ name: "", location: "", description: "" });
  const [editingVenue, setEditingVenue] = useState(null);

  const handleAddVenue = () => {
    addVenue.mutate(newVenue);
    setNewVenue({ name: "", location: "", description: "" });
  };

  const handleUpdateVenue = (venue) => {
    updateVenue.mutate(venue);
    setEditingVenue(null);
  };

  const handleDeleteVenue = (id) => {
    deleteVenue.mutate(id);
  };

  if (isLoading) return <Text>Loading...</Text>;
  if (isError) return <Text>Error loading venues</Text>;

  return (
    <Container maxW="container.md" py={4}>
      <Heading mb={4}>Venues</Heading>
      <VStack spacing={4} align="stretch">
        {venues.map((venue) => (
          <Box key={venue.id} p={4} borderWidth="1px" borderRadius="md">
            {editingVenue?.id === venue.id ? (
              <VStack spacing={2} align="stretch">
                <Input
                  placeholder="Name"
                  value={editingVenue.name}
                  onChange={(e) => setEditingVenue({ ...editingVenue, name: e.target.value })}
                />
                <Input
                  placeholder="Location"
                  value={editingVenue.location}
                  onChange={(e) => setEditingVenue({ ...editingVenue, location: e.target.value })}
                />
                <Textarea
                  placeholder="Description"
                  value={editingVenue.description}
                  onChange={(e) => setEditingVenue({ ...editingVenue, description: e.target.value })}
                />
                <HStack spacing={2}>
                  <Button colorScheme="teal" onClick={() => handleUpdateVenue(editingVenue)}>
                    Save
                  </Button>
                  <Button onClick={() => setEditingVenue(null)}>Cancel</Button>
                </HStack>
              </VStack>
            ) : (
              <>
                <Text fontSize="xl">{venue.name}</Text>
                <Text>{venue.location}</Text>
                <Text>{venue.description}</Text>
                <HStack spacing={2} mt={2}>
                  <Button size="sm" onClick={() => setEditingVenue(venue)}>
                    Edit
                  </Button>
                  <Button size="sm" colorScheme="red" onClick={() => handleDeleteVenue(venue.id)}>
                    Delete
                  </Button>
                </HStack>
              </>
            )}
          </Box>
        ))}
      </VStack>
      <Box mt={8}>
        <Heading size="md" mb={2}>Add New Venue</Heading>
        <VStack spacing={2} align="stretch">
          <Input
            placeholder="Name"
            value={newVenue.name}
            onChange={(e) => setNewVenue({ ...newVenue, name: e.target.value })}
          />
          <Input
            placeholder="Location"
            value={newVenue.location}
            onChange={(e) => setNewVenue({ ...newVenue, location: e.target.value })}
          />
          <Textarea
            placeholder="Description"
            value={newVenue.description}
            onChange={(e) => setNewVenue({ ...newVenue, description: e.target.value })}
          />
          <Button colorScheme="teal" onClick={handleAddVenue}>
            Add Venue
          </Button>
        </VStack>
      </Box>
    </Container>
  );
};

export default Venues;