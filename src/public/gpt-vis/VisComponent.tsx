// eslint-disable-next-line @typescript-eslint/no-explicit-any
import {
  Container, Group, Image, Stack, Radio,
} from '@mantine/core';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function VisCompnent({ parameters }: { parameters: any }) {
  const { imgName, options, correctIndex } = parameters;

  return (
    <div>
      <Group>
        <Image src={`./${imgName}`} alt="image" width={800} />
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
    </div>
  );
}

export default VisCompnent;
