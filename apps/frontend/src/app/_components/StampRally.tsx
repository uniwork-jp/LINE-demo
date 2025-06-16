'use client';

import { useStampRally } from '@line-demo/shared/contexts/StampRallyContext';
import { QRScanner } from './QRScanner';
import { Container, Title, Text, SimpleGrid, Card, Button, Group, Stack } from '@mantine/core';

export const StampRally = () => {
  const { stamps, collectedCount, isCompleted, resetStamps } = useStampRally();

  return (
    <Container size="md" py="xl">
      <Stack align="center" gap="md" mb="xl">
        <Title order={1}>スタンプラリー</Title>
        <Text c="dimmed" size="lg">
          獲得スタンプ: {collectedCount}/8
        </Text>
      </Stack>

      <SimpleGrid
        cols={{ base: 2, sm: 3, md: 4 }}
        spacing="md"
        mb="xl"
      >
        {stamps.map((stamp) => (
          <Card
            key={stamp.id}
            padding="md"
            radius="md"
            withBorder
            bg={stamp.isCollected ? 'var(--mantine-color-green-0)' : 'var(--mantine-color-gray-0)'}
            style={{ aspectRatio: '1' }}
          >
            <Stack align="center" justify="center" h="100%">
              <Text fw={700} size="lg" ta="center">
                {stamp.name}
              </Text>
              <Text size="sm" c="dimmed" ta="center">
                {stamp.location}
              </Text>
              {stamp.isCollected && (
                <Text c="green" fw={500}>
                  ✓ 獲得済み
                </Text>
              )}
            </Stack>
          </Card>
        ))}
      </SimpleGrid>

      <QRScanner />

      {isCompleted && (
        <Stack align="center" mt="xl" gap="md">
          <Card bg="var(--mantine-color-green-0)" radius="md" p="md">
            <Text c="green.8" ta="center" fw={500}>
              おめでとうございます！全てのスタンプを集めました！
            </Text>
          </Card>
          <Button
            variant="light"
            color="gray"
            onClick={resetStamps}
            size="md"
          >
            リセット
          </Button>
        </Stack>
      )}
    </Container>
  );
}; 