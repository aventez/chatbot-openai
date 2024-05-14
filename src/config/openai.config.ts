import { registerAs } from '@nestjs/config';

export default registerAs('openai', () => ({
  api_key: process.env.OPENAI_API_KEY,
  assistant_id: process.env.OPENAI_ASSISTANT_ID,
}));
