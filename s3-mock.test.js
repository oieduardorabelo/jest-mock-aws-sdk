let AWS = require('aws-sdk');

jest.mock('aws-sdk', () => {
  let instance = {
    upload: jest.fn().mockReturnThis(),
    promise: jest.fn(),
  };
  return { S3: jest.fn(() => instance) };
});


describe("setup for s3.upload testing", () => {
  let testS3;
  beforeEach(() => {
    testS3 = new AWS.S3();
    testS3.promise.mockReturnValueOnce({ Bucket: 'TestBucketName' });
  })

  test('returns expected upload value', async () => {
    let params = {};
    let result = await testS3.upload(params).promise();
    expect(result).toEqual({ Bucket: 'TestBucketName' });
    expect(result.Bucket).toBe("TestBucketName")
  });
});
