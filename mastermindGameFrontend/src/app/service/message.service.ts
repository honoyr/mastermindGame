import {Injectable} from '@angular/core';
import {MessageEnumId} from "../model/MessageEnumId";
import {MatDialogData} from "../model/MatDialogData";
import {GameModel} from "../model/Game";

export interface DialogData {
  title: string;
  content: string;
  other: string;
  button: string;
}

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private _title!: string;
  private _content!: string;
  private _other!: string;
  private _button!: string;

  constructor() { }

  get title(): string {
    return this._title;
  }

  set title(value: string) {
    this._title = value;
  }

  get content(): string {
    return this._content;
  }

  set content(value: string) {
    this._content = value;
  }

  get other(): string {
    return this._other;
  }

  set other(value: string) {
    this._other = value;
  }

  get button(): string {
    return this._button;
  }

  set button(value: string) {
    this._button = value;
  }

  createTitle(messageId: MessageEnumId) {

    switch (messageId){
      case MessageEnumId.winner:
        return MatDialogData.titleWinner;
      case MessageEnumId.changeSettings:
        return MatDialogData.titleWarning;
      default:
        return "Missing title";
    }
  }

  createContent(messageId: MessageEnumId, gameModel: GameModel) {
    switch (messageId){
      case MessageEnumId.winner:
        return gameModel.content;
      case MessageEnumId.changeSettings:
        return MatDialogData.changeSettings;
      default:
        return "Missing content";
    }
  }

  createOther(messageId: MessageEnumId, gameModel: GameModel) {
    switch (messageId){
      case MessageEnumId.winner:
        return `Game was finished on ${gameModel.attemptsCounter}th attempt.`;
      default:
        return "";
    }
  }

  createButton (messageId: MessageEnumId) {
    switch (messageId){
      case MessageEnumId.winner:
        return MatDialogData.buttonTryAgain;;
      case MessageEnumId.changeSettings:
        return MatDialogData.buttonApply;
      default:
        return "OK";
    }
  }

  getGameMessage(messageId: MessageEnumId, gameModel: GameModel){
    console.log(gameModel);
    const message: DialogData = {
      title: this.createTitle(messageId),
      content: this.createContent(messageId, gameModel),
      other: this.createOther(messageId, gameModel),
      button: this.createButton(messageId)
    }
    return message;
  }

}
