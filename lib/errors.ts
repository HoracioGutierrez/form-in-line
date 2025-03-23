type ErrorResponse = {
    error: string
}

type FormatResponse = {
    hasError?: boolean
    data?: any
    errorMessage?: string
}

export const formatResponse = ({ hasError = false, data = null, errorMessage = "" }: FormatResponse) => {

    let template = {
        data: null,
        errorMessage: '',
        hasError: false
    }

    template.hasError = hasError
    template.data = data
    template.errorMessage = errorMessage

    return template
}

export const formatError = ({ error }: ErrorResponse) => {
    return formatResponse({ hasError: true, errorMessage: error })
}