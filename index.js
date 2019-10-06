// Imports the Google Cloud client library
const language = require("@google-cloud/language");

const { graphql } = require("@octokit/graphql");
const { createAppAuth } = require("@octokit/auth-app");

// Detects the sentiment of the document

async function sentiment(text) {
  // Creates a client
  const client = new language.LanguageServiceClient();
  // Prepares a document, representing the provided text
  const document = {
    content: text,
    type: "PLAIN_TEXT"
  };
  //   console.log(text);
  const [result] = await client.analyzeSentiment({ document });

  const sentiment = result.documentSentiment;
  //   console.log(`Document sentiment:`);

  const sentences = result.sentences;
  //   sentences.forEach(sentence => {
  // console.log(`Sentence: ${sentence.text.content}`);
  // console.log(`  Score: ${sentence.sentiment.score}`);
  // console.log(`  Magnitude: ${sentence.sentiment.magnitude}`);
  //   });
  return [sentiment.score, sentiment.magnitude];
}

async function userComments(user, num) {
  const comments = graphql({
    query: `query user($login: String!, $num: Int!) {
            user(login: $login) {
              issueComments(last: $num) {
                nodes {
                  body
                }
              }
            }
          }`,
    login: user,
    num: num,
    headers: {
      authorization: `token ` + process.argv[2]
    }
  });
  return comments;
}

async function average(user, num) {
  res = await userComments(user, num);
  var sentsum = 0;
  var sentcount = 0;
  for (let x of res.user.issueComments.nodes) {
    [sent, magn] = await sentiment(x.body);
    if (magn >= 2) {
      sentsum = sentsum + parseFloat(sent);
      sentcount++;
    }
  }
  console.log(
    "Sentiment sum: ",
    sentsum,
    "Number of comments with mgn >=2 : ",
    sentcount,
    "Sentiment average: ",
    sentsum / sentcount
  );
  return [sentsum, sentcount, sentsum / sentcount];
}
average(process.argv[3], parseInt(process.argv[4]));
