import { SetMetadata } from '@nestjs/common';

export const PASS_RESP_META_KEY = 'pass-resp';
export const PassResp = () => SetMetadata(PASS_RESP_META_KEY, true);
