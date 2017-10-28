export const NotFoundError = word => new Error(`"${word}" not found in RAE`);

export const NotValidWordError = word =>
  new Error(`"${word}" word param provided must be a valid string`);

export const ParserError = error =>
  new Error(`"${error.message}" parser error found. Please raise an issue at https://github.com/Tsur/node-rae/issues`);

export const NoChallengeScriptFoundError = error =>
  new Error(`No challenge SCRIPT found!, It is possible due to RAE updated its API. Please raise an issue at https://github.com/Tsur/node-rae/issues`);
