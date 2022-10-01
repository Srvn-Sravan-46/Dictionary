import {QStatusType} from '../types/question-status';
import {getAsyncStorageData, setAsyncStorageData} from './async-storage';

function CalculateScore(elapsedTime) {
  let coins = 0;
  if (elapsedTime <= 20 && elapsedTime > 15) {
    coins = 1;
  } else if (elapsedTime <= 15 && elapsedTime > 10) {
    coins = 2;
  } else if (elapsedTime <= 10 && elapsedTime > 5) {
    coins = 3;
  } else if (elapsedTime <= 5 && elapsedTime > 0) {
    coins = 4;
  }
  return coins;
}

function HandleUserChoice(
  userChoice,
  answer,
  levelStatus,
  currentQuestion,
  elapsedTime,
  nav
) {
  let lcoins = CalculateScore(elapsedTime);
  let tmpStatus = [];
  if (userChoice === answer) {
    lcoins = CalculateScore(elapsedTime);
    tmpStatus = levelStatus.map((x, index) => {
      if (index === currentQuestion) {
        return QStatusType.CORRECT_ANS;
      } else if (index === currentQuestion + 1) {
        return QStatusType.CURRENT;
      } else {
        return x;
      }
    });
  } else {
    lcoins = 0;
    tmpStatus = levelStatus.map((x, index) => {
      if (index === currentQuestion) {
        return QStatusType.WRONG_ANS;
      } else if (index === currentQuestion + 1) {
        return QStatusType.CURRENT;
      } else {
        return x;
      }
    });
  }

  const saveData = {
    name: '',
    email: '',
    password: '',
    phone: '',
    currentQuestion: 0,
    coins: 0,
    time: '01:00',
    levelStatus: [
      QStatusType.UNATTEMPTED,
      QStatusType.UNATTEMPTED,
      QStatusType.UNATTEMPTED,
      QStatusType.UNATTEMPTED,
      QStatusType.UNATTEMPTED,
      QStatusType.UNATTEMPTED,
      QStatusType.UNATTEMPTED,
      QStatusType.UNATTEMPTED,
      QStatusType.UNATTEMPTED,
      QStatusType.UNATTEMPTED,
    ],
  };

  let userInfo = getAsyncStorageData();
  if (!userInfo) {
    userInfo.levelStatus = tmpStatus;
    userInfo.coins = lcoins;
    setAsyncStorageData(userInfo);
  } else {
    setAsyncStorageData(saveData);
  }


}

export {CalculateScore, HandleUserChoice};