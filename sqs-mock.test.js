let AWS = require('aws-sdk');

jest.mock('aws-sdk', () => {
  let instance = {
    sendMessage: jest.fn().mockReturnThis(),
    promise: jest.fn(),
  };
  return { SQS: jest.fn(() => instance) };
});


describe("setup for sqs.sendMessage testing", () => {
  let testSQS;
  beforeEach(() => {
    testSQS = new AWS.SQS();
    testSQS.promise.mockReturnValueOnce({ MessageId: 'TestSQSId' });
  })

  test('returns expected message id', async () => {
    let params = {};
    let result = await testSQS.sendMessage(params).promise();
    expect(result).toEqual({ MessageId: 'TestSQSId' });
    expect(result.MessageId).toBe("TestSQSId")
  });
});
