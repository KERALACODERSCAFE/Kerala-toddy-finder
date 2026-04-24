from django.conf import settings


class EnforceStandardResponseMiddleware:
    """
    Middleware that enforces architectural standards for API responses.
    It intentionally crashes the app with an AssertionError during development
    if a view bypasses the standardized `shared.responses.APIResponse` wrapper.
    """

    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        response = self.get_response(request)

        # We only rigorously enforce this during development/testing
        # to ensure production systems don't crash over structural warnings.
        # It relies on DRF's Response object inspection.
        if (
            settings.DEBUG
            and hasattr(response, "data")
            and request.path.startswith("/api/")
        ):
            # It's an API Response. Let's inspect it.
            data = getattr(response, "data", {})

            # If the response hasn't been intercepted by custom_exception_handler
            # and is just a raw dictionary or list returned by a developer:
            if isinstance(data, dict):
                required_keys = {"status", "message", "data"}

                # Check if it has our required structured keys
                if not required_keys.issubset(data.keys()):
                    raise AssertionError(
                        f"\n\n[GUARDRAIL VIOLATION] "
                        f"API endpoint '{request.path}' returned an incorrectly typed response.\n"
                        f"Expected payload keys: {required_keys}\n"
                        f"Actual payload keys:   {set(data.keys())}\n"
                        f"Action: Please wrap your return value using `shared.responses.APIResponse`.\n"
                    )

        return response
