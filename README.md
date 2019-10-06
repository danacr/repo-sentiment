# Analyze user comments sentiment

Requires Google Cloud Natural Language API: https://cloud.google.com/natural-language/docs/quickstart-client-libraries

Usage:

```
export GOOGLE_APPLICATION_CREDENTIALS="/home/user/Downloads/[FILE_NAME].json"
node index.js GITHUB_API_KEY GITHUB_USERNAME_TO_CHECK NUMBER_OF_COMMENTS_TO_CHECK
```

E.g.

```
➜  user-sentiment git:(master) ✗ node index.js GITHUB_API_KEY jbeda 50
Sentiment sum:  1.1000000163912773 Number of comments with mgn >=2 :  12 Sentiment average:  0.09166666803260644
```

> Note, above 0 means good :)
