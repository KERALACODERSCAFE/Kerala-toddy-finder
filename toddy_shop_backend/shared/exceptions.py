import logging
from django.http import Http404
from rest_framework.views import exception_handler
from django.core.exceptions import ValidationError as DjangoValidationError

logger = logging.getLogger(__name__)


def custom_exception_handler(exc, context):
    """
    Custom exception handler that standardizes error responses.
    """
    response = exception_handler(exc, context)

    if response is not None:
        # Standard DRF exception
        custom_response_data = {
            "status": "error",
            "message": _get_error_message(response.data),
            "data": response.data,
        }
        response.data = custom_response_data
    else:
        # Unhandled exception
        logger.error(f"Unhandled Exception: {exc}", exc_info=True)
        if isinstance(exc, DjangoValidationError):
            data = (
                exc.message_dict
                if hasattr(exc, "message_dict")
                else {"error": list(exc)}
            )
            return _create_error_response("Validation Error", 400, data)
        elif isinstance(exc, Http404):
            return _create_error_response("Not Found", 404, None)

        # Fallback for unexpected errors
        return _create_error_response("An unexpected error occurred.", 500, str(exc))

    return response


def _get_error_message(data):
    if isinstance(data, dict):
        if "detail" in data:
            return data["detail"]
        # Return the first error value as message
        first_key = list(data.keys())[0]
        first_value = data[first_key]
        if isinstance(first_value, list):
            return f"{first_key}: {first_value[0]}"
        return f"{first_key}: {first_value}"
    elif isinstance(data, list) and data:
        return str(data[0])
    return "An error occurred."


def _create_error_response(message, status_code, data):
    from rest_framework.response import Response

    return Response(
        {"status": "error", "message": message, "data": data}, status=status_code
    )
