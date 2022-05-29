import { SubmitFeedbackUseCase } from "./submit-feedback-use-case"

const createSpy = jest.fn()
const sendMailSpy = jest.fn()

describe('SubmitFeedback', () => {
  let submitFeedback: SubmitFeedbackUseCase

  beforeEach(() => {
    submitFeedback = new SubmitFeedbackUseCase(
      { create: createSpy },
      { sendMail: sendMailSpy }
    )
  })

  it('should be able to submit a feedback', async () => {
    await expect(submitFeedback.execute({
      type: 'BUG',
      comment: 'example comment',
      screenshot: 'data:image/png;base64,test.png'
    })).resolves.not.toThrow()

    expect(createSpy).toHaveBeenCalled()
    expect(sendMailSpy).toHaveBeenCalled()
  })

  it('should not be able to submit a feedback without type', async () => {
    await expect(submitFeedback.execute({
      type: '',
      comment: 'example comment',
      screenshot: 'data:image/png;base64,test.png'
    })).rejects.toThrow()
  })

  it('should not be able to submit a feedback without comment', async () => {
    await expect(submitFeedback.execute({
      type: 'BUG',
      comment: '',
      screenshot: 'data:image/png;base64,test.png'
    })).rejects.toThrow()
  })

  it('should not be able to submit a feedback with invalid image format', async () => {
    await expect(submitFeedback.execute({
      type: 'BUG',
      comment: 'example comment',
      screenshot: 'test.png'
    })).rejects.toThrow()
  })
})