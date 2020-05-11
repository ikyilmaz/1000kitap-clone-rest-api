import { BaseController } from '../../base/base.controller';
import { FavoriteAuthorService } from './favorite-author.service';

export class FavoriteAuthorController extends  BaseController{
     constructor(public favoriteAuthorService: FavoriteAuthorService) {
         super(favoriteAuthorService.model);
     }
}