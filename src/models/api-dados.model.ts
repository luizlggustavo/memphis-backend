import { ApiProperty } from '@nestjs/swagger'

export class ApiDados {

	@ApiProperty({ type: String })
	moeda: String

	@ApiProperty({ type: String })
	metodo: String
	
}
