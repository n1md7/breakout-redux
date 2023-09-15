import { Mode } from '/src/enums/mode';
import * as yup from 'yup';

export const envSchema = yup.object().shape({
  mode: yup.string().oneOf(Object.values(Mode)).required(),
});
