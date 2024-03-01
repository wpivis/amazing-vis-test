import {
  Stack, Radio, Text, Group, Divider,
} from '@mantine/core';
import { RadioResponse } from '../../parser/types';
import { generateErrorMessage } from './utils';
import ReactMarkdownWrapper from '../ReactMarkdownWrapper';

type inputProps = {
  response: RadioResponse;
  disabled: boolean;
  answer: object;
  vertical:boolean;
};

export default function RadioInput({
  response,
  disabled,
  answer,
  vertical = false,
}: inputProps) {
  const {
    prompt, required, options, leftLabel, rightLabel,
  } = response;

  return (
    <Radio.Group
      name={`radioInput${response.id}`}
      label={<ReactMarkdownWrapper text={prompt} />}
      // withAsterisk={required}
      size="md"
      key={response.id}
      {...answer}
        // This overrides the answers error. Which..is bad?
      error={generateErrorMessage(response, answer, options)}
    >
      {leftLabel ? <Text>{leftLabel}</Text> : null}
      {vertical ? (
        <Stack mt="xs">
          {options.map((radio) => (
            <>
              <Radio
                disabled={disabled}
                value={radio.value}
                label={radio.label}
                key={radio.label}
              />
              <Divider />
            </>

          ))}
        </Stack>
      )
        : (
          <Group mt="xs">
            {options.map((radio) => (
              <Radio
                disabled={disabled}
                value={radio.value}
                label={radio.label}
                key={radio.label}
              />
            ))}
          </Group>
        )}

      <Text>{rightLabel}</Text>

    </Radio.Group>
  );
}
