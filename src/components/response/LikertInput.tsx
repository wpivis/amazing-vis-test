import { LikertResponse, RadioResponse } from '../../parser/types';
import RadioInput from './RadioInput';

type inputProps = {
  response: LikertResponse;
  disabled: boolean;
  answer: object;
};

export default function LikertInput({
  response,
  disabled,
  answer,
}: inputProps) {
  const { preset } = response;

  const options = [];

  for (let i = 1; i <= +preset; i += 1) {
    options.push({ label: `${i}`, value: `${i}` });
  }

  const radioResponse: RadioResponse = {
    ...response,
    type: 'radio',
    options,
  };

  return (
    <RadioInput
      disabled={disabled}
      response={radioResponse}
      answer={answer}
      vertical={false}
    />
  );
}
