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
  ordinals: string[] = ['th','st','nd','rd'];

  /**
   * Append ordinal to number (e.g. "1st" position)
   * Usage:
   *   value | ordinal:keepNumber
   * Example:
   *   {{ 23 |  ordinal}}
   *   formats to: '23rd'
   * Example:
   *   {{ 23 |  ordinal:false}}
   *   formats to: 'rd'
  */
  private transformOrdinal(n: number, keepNumber: boolean = true) {
    let v = n % 100;
    return (this.ordinals[(v-20)%10]||this.ordinals[v]||this.ordinals[0]);
  }

  private createTitle(messageId: MessageEnumId) {
    switch (messageId){
      case MessageEnumId.winner:
        return MatDialogData.titleWinner;
      case MessageEnumId.changeSettings:
        return MatDialogData.titleWarning;
      default:
        return "Missing title";
    }
  }

  private createContent(messageId: MessageEnumId, gameModel: GameModel) {
    switch (messageId){
      case MessageEnumId.winner:
        return gameModel.content;
      case MessageEnumId.changeSettings:
        return MatDialogData.changeSettings;
      default:
        return "Missing content";
    }
  }

  private createOther(messageId: MessageEnumId, gameModel: GameModel) {
    const ordinal = this.transformOrdinal(gameModel.attemptCounter)
    switch (messageId){
      case MessageEnumId.winner:
        return `Game was finished on ${gameModel.attemptCounter}${ordinal} attempt.`;
      default:
        return "";
    }
  }

  private createButton (messageId: MessageEnumId) {
    switch (messageId){
      case MessageEnumId.winner:
        return MatDialogData.buttonTryAgain;;
      case MessageEnumId.changeSettings:
        return MatDialogData.buttonApply;
      default:
        return "OK";
    }
  }

  public getGameMessage(messageId: MessageEnumId, gameModel: GameModel) : DialogData {
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
