import cheerio from 'cheerio';
import { RAE_FETCH_ACTION } from 'helpers/constants';
import { NoChallengeScriptFoundError, ParserError } from 'lib/clients/http/errors';

function parseAuth(domAsString) {
  const formData = {};
  return (resolve, reject) => {
    try {
      const $ = cheerio.load(domAsString);
      const crc = $('script')
        .eq(1)
        .html();
      if (!crc) throw NoChallengeScriptFoundError();
      const challengeScriptPosition = crc.indexOf('function challenge()');
      if (challengeScriptPosition < 0) throw NoChallengeScriptFoundError();
      const oohhMyRaeFriendthatsAnEasyChallengeHaHa = new Function(`return ${crc
        .substr(challengeScriptPosition)
        .replace('document.forms[0].elements[1].value=', 'return ')}`)();
      const challengeCode = oohhMyRaeFriendthatsAnEasyChallengeHaHa();
      $('body input').each((i, el) => {
        formData[$(el).attr('name')] = $(el).attr('value') || challengeCode;
      });
      resolve(formData);
    } catch (error) {
      reject(ParserError(error));
    }
  };
}

function parseData(domAsString) {
  const result = { multipleMatches: false, items: [] };
  return (resolve, reject) => {
    try {
      const $ = cheerio.load(domAsString);
      result.multipleMatches = !!$('body ul li a').length;
      if (!result.multipleMatches) {
        $('body p').each((i, elem) => result.items.push({ match: $(elem).text() }));
      } else {
        $('body ul li a').each((i, elem) =>
          result.items.push({
            match: $(elem).text(),
            id: $(elem)
              .attr('href')
              .replace(RAE_FETCH_ACTION, ''),
          }));
      }

      resolve(result);
    } catch (error) {
      reject(ParserError(error));
    }
  };
}

export function parseAuthData(domAsString) {
  return new Promise(parseAuth(domAsString));
}

export function parseRaeData(domAsString) {
  return new Promise(parseData(domAsString));
}
