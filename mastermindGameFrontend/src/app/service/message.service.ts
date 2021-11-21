import {Injectable} from '@angular/core';
import {MessageEnumId} from "../model/MessageEnumId";
import {MatDialogData} from "../model/MatDialogData";
import {GameStateDto} from "../model/Game";

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

  createContent(messageId: MessageEnumId, gameState: GameStateDto) {
    switch (messageId){
      case MessageEnumId.winner:
        return gameState.content;
      case MessageEnumId.changeSettings:
        return MatDialogData.changeSettings;
      default:
        return "Missing content";
    }
  }

  createOther(messageId: MessageEnumId, gameState: GameStateDto) {
    switch (messageId){
      case MessageEnumId.winner:
        return `Game was finished on ${gameState.numberOfAttempts}th attempt.`;
      case MessageEnumId.winner:
        return `Game was finished on ${gameState.numberOfAttempts}th attempt.`;
      default:
        return "";
    }
  }

  createButton (messageId: MessageEnumId) {
    switch (messageId){
      case MessageEnumId.winner:
        return MatDialogData.buttonTryAgain;;
      case MessageEnumId.winner:
        return MatDialogData.buttonTryAgain;
      case MessageEnumId.changeSettings:
        return MatDialogData.buttonApply;
      default:
        return "Apply";
    }
  }

  getGameMessage(messageId: MessageEnumId, gameState: GameStateDto){
    console.log(gameState);
    const message: DialogData = {
      title: this.createTitle(messageId),
      content: this.createContent(messageId, gameState),
      other: this.createOther(messageId, gameState),
      button: this.createButton(messageId)
    }
    return message;
  }

}
