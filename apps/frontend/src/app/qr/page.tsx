'use client';

import Image from 'next/image';
import { Container, Title, SimpleGrid, Card, Text, Stack } from '@mantine/core';

const QR_CODES = [
  { id: 1, name: 'スタンプ1', location: '東京駅' },
  { id: 2, name: 'スタンプ2', location: '新宿駅' },
  { id: 3, name: 'スタンプ3', location: '渋谷駅' },
  { id: 4, name: 'スタンプ4', location: '池袋駅' },
  { id: 5, name: 'スタンプ5', location: '上野駅' },
  { id: 6, name: 'スタンプ6', location: '品川駅' },
  { id: 7, name: 'スタンプ7', location: '秋葉原駅' },
  { id: 8, name: 'スタンプ8', location: '東京スカイツリー' },
];

export default function QRPage() {
  return (
    <Container size="lg" py="xl">
      <Stack align="center" gap="xl">
        <Title order={1}>スタンプラリー QRコード</Title>
        
        <SimpleGrid
          cols={{ base: 2, sm: 3, md: 4 }}
          spacing="lg"
        >
          {QR_CODES.map((qr) => (
            <Card
              key={qr.id}
              padding="md"
              radius="md"
              withBorder
              shadow="sm"
              style={{ aspectRatio: '1' }}
            >
              <Stack align="center" justify="center" h="100%" gap="md">
                <div className="relative w-24 h-24">
                  <Image
                    src={`/qrs/stamp_qr_${qr.id}.png`}
                    alt={`${qr.name}のQRコード`}
                    fill
                    className="object-contain"
                    priority={qr.id <= 4}
                  />
                </div>
                <Stack gap="xs" align="center">
                  <Text fw={600} size="lg" ta="center">
                    {qr.name}
                  </Text>
                  <Text size="sm" c="dimmed" ta="center">
                    {qr.location}
                  </Text>
                </Stack>
              </Stack>
            </Card>
          ))}
        </SimpleGrid>
      </Stack>
    </Container>
  );
}