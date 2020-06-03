import { ApiProperty } from '@nestjs/swagger'

export class Usuario {

	@ApiProperty({ type: String })
	userId: number;

	@ApiProperty({ type: String })
	username: string;

	@ApiProperty({ type: String })
	password: string;

}
