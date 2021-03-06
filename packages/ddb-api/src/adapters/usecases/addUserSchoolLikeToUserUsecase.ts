import { User } from '../../models/User'
import { UserSchoolLike } from '../../models/UserSchoolLike'
import { UserRepository } from '../respositories/userRepository'

export interface AddUserSchoolLikeToUserUsecase {
  call: (userSchoolLike: UserSchoolLike) => Promise<User | null>
}

export default class AddUserSchoolLikeToUserUsecaseImpl
  implements AddUserSchoolLikeToUserUsecase
{
  constructor(private readonly userRepository: UserRepository) {}

  call = (userSchoolLike: UserSchoolLike): Promise<User | null> => this.userRepository.addUserSchoolLike(userSchoolLike)
}
