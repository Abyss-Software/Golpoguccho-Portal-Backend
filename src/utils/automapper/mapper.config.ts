import { User } from 'src/users/users.entity';
import { AutoMapper } from './automapper';
import { SignUpResponseDto } from 'src/auth/dto/response/signup-response.dto';

/**
 * The singleton instance of the AutoMapper class.
 * @type {AutoMapper}
 */
export const mapper = AutoMapper.getInstance();

/** Set the mappings for the User model and User res dto. */
mapper.setMapping(User, SignUpResponseDto);

/** Set the mappings for the Blog model and Blog res dto. */
