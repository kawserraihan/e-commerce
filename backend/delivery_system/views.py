from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import HTTP_400_BAD_REQUEST, HTTP_201_CREATED
from .serializers import DeliveryInfoSerializer

class DeliveryView(APIView):
    def post(self, request):
        serializer = DeliveryInfoSerializer(data=request.data)
        if serializer.is_valid():
            checkout_info = serializer.save()
            return Response({
                'message': 'Checkout info saved successfully',
                'checkout_id': checkout_info.id
            }, status=HTTP_201_CREATED)
        return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)
