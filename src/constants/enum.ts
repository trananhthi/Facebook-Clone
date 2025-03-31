export const enum StatusEnum {
  ACT = 'ACT',
  DEL = 'DEL',
  APP = 'APP',
  TEM = 'TEM'
}

export const enum PrivacyEnum {
  PUBLIC = 'PUBLIC',
  FRIEND = 'FRIEND',
  EXCEPT_FRIEND = 'EXCEPT_FRIEND',
  SPECIFIC_FRIEND = 'SPECIFIC_FRIEND',
  ONLY_ME = 'ONLY_ME',
  CUSTOM = 'CUSTOM'
}

export const enum TypePostEnum {
  TEXT = 'TEXT',
  /* image */
  IMAGE = 'IMAGE',
  /* video */
  VIDEO = 'VIDEO',
  /* all */
  HYBRID = 'HYBRID'
}

export const enum MediaTypeEnum {
  IMAGE = 'IMAGE',
  VIDEO = 'VIDEO'
}

export const enum WSEventEnum {
  SEND_MESSAGE = 'SEND_MESSAGE',
  DELETE_MESSAGE = 'DELETE_MESSAGE',
  UPDATE_MESSAGE = 'UPDATE_MESSAGE',
  REACTION_MESSAGE = 'REACTION_MESSAGE',
  READ_MESSAGE = 'READ_MESSAGE',
  TYPING = 'TYPING',
  STOP_TYPING = 'STOP_TYPING'
}
