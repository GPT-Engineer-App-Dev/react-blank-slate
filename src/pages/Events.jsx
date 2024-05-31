import { useState } from "react";
import { Container, Heading, Button, VStack, HStack, Text, Box, Input, Textarea } from "@chakra-ui/react";
import { useEvents, useAddEvent, useUpdateEvent, useDeleteEvent } from "../integrations/supabase/index.js";

const Events = () => {
  const { data: events, isLoading, isError } = useEvents();
  const addEvent = useAddEvent();
  const updateEvent = useUpdateEvent();
  const deleteEvent = useDeleteEvent();

  const [newEvent, setNewEvent] = useState({ name: "", date: "", description: "", venue_id: "" });
  const [editingEvent, setEditingEvent] = useState(null);

  const handleAddEvent = () => {
    addEvent.mutate(newEvent);
    setNewEvent({ name: "", date: "", description: "", venue_id: "" });
  };

  const handleUpdateEvent = (event) => {
    updateEvent.mutate(event);
    setEditingEvent(null);
  };

  const handleDeleteEvent = (id) => {
    deleteEvent.mutate(id);
  };

  if (isLoading) return <Text>Loading...</Text>;
  if (isError) return <Text>Error loading events</Text>;

  return (
    <Container maxW="container.md" py={4}>
      <Heading mb={4}>Events</Heading>
      <VStack spacing={4} align="stretch">
        {events.map((event) => (
          <Box key={event.id} p={4} borderWidth="1px" borderRadius="md">
            {editingEvent?.id === event.id ? (
              <VStack spacing={2} align="stretch">
                <Input
                  placeholder="Name"
                  value={editingEvent.name}
                  onChange={(e) => setEditingEvent({ ...editingEvent, name: e.target.value })}
                />
                <Input
                  placeholder="Date"
                  value={editingEvent.date}
                  onChange={(e) => setEditingEvent({ ...editingEvent, date: e.target.value })}
                />
                <Textarea
                  placeholder="Description"
                  value={editingEvent.description}
                  onChange={(e) => setEditingEvent({ ...editingEvent, description: e.target.value })}
                />
                <Input
                  placeholder="Venue ID"
                  value={editingEvent.venue_id}
                  onChange={(e) => setEditingEvent({ ...editingEvent, venue_id: e.target.value })}
                />
                <HStack spacing={2}>
                  <Button colorScheme="teal" onClick={() => handleUpdateEvent(editingEvent)}>
                    Save
                  </Button>
                  <Button onClick={() => setEditingEvent(null)}>Cancel</Button>
                </HStack>
              </VStack>
            ) : (
              <>
                <Text fontSize="xl">{event.name}</Text>
                <Text>{event.date}</Text>
                <Text>{event.description}</Text>
                <Text>Venue ID: {event.venue_id}</Text>
                <HStack spacing={2} mt={2}>
                  <Button size="sm" onClick={() => setEditingEvent(event)}>
                    Edit
                  </Button>
                  <Button size="sm" colorScheme="red" onClick={() => handleDeleteEvent(event.id)}>
                    Delete
                  </Button>
                </HStack>
              </>
            )}
          </Box>
        ))}
      </VStack>
      <Box mt={8}>
        <Heading size="md" mb={2}>Add New Event</Heading>
        <VStack spacing={2} align="stretch">
          <Input
            placeholder="Name"
            value={newEvent.name}
            onChange={(e) => setNewEvent({ ...newEvent, name: e.target.value })}
          />
          <Input
            placeholder="Date"
            value={newEvent.date}
            onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
          />
          <Textarea
            placeholder="Description"
            value={newEvent.description}
            onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
          />
          <Input
            placeholder="Venue ID"
            value={newEvent.venue_id}
            onChange={(e) => setNewEvent({ ...newEvent, venue_id: e.target.value })}
          />
          <Button colorScheme="teal" onClick={handleAddEvent}>
            Add Event
          </Button>
        </VStack>
      </Box>
    </Container>
  );
};

export default Events;