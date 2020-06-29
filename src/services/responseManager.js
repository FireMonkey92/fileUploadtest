import { EventEmitter } from 'events';
import { STATUS_CODES, STATE_EVENTS } from '../constants/enums';
import { USER_ACTIONS } from '../store/actions-names/users';

class ResponseManager extends EventEmitter {
  constructor() {
    super();
    this.actionToEmit = {
      name: '',
      data: '',
    };
  }

  create(name, data = null) {
    const defaultAction = { name, data };
    this.actionToEmit = defaultAction;
    this.emitChange();
  }

  receive(response) {
    if (response.status === STATUS_CODES.UNAUTHORIZED) {
      this.create(USER_ACTIONS.SIGN_OUT);
    }
  }

  emitChange() {
    this.emit(STATE_EVENTS.CHANGE, this.actionToEmit);
  }

  addChangeListener(callback) {
    this.addListener(STATE_EVENTS.CHANGE, callback);
  }

  removeChangeListener(callback) {
    this.removeListener(STATE_EVENTS.CHANGE, callback);
  }
}

export default new ResponseManager();
