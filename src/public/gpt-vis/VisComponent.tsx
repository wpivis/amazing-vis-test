// eslint-disable-next-line @typescript-eslint/no-explicit-any
import {
  Container, Group, Image, Stack, Radio,
} from '@mantine/core';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function VisCompnent({ parameters }: { parameters: any }) {
  const { imgName, options, correctIndex } = parameters;

  return (
    <Container>
      <Group m={5} p={5} sx={{ border: '1px solid black', borderRadius: '5px' }}>
        <Image src={`/gpt-expert/${imgName}`} alt="image" width={700} />
        <Stack mt="xs">
          {
                        options.map((option: string, index: number) => (
                          <Radio
                            key={index}
                            value={index}
                            label={option}
                            checked
                            color={index === correctIndex ? 'green' : 'dark'}
                          />
                        ))
                    }
        </Stack>
      </Group>
    </Container>
  );
}

export default VisCompnent;
