from rest_framework.response import Response


class APIResponse(Response):
    """
    Standardized API Response wrapper.
    Formats the response to: { "status": "...", "message": "...", "data": ... }
    """

    def __init__(
        self, data=None, status=200, message="Success", is_success=True, **kwargs
    ):
        status_label = "success" if is_success else "error"

        response_data = {"status": status_label, "message": message, "data": data}

        super().__init__(data=response_data, status=status, **kwargs)
