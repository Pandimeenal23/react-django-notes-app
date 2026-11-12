from django.shortcuts import render


from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Note
from .serializers import NoteSerializer, RegisterSerializer
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.decorators import permission_classes
from rest_framework.permissions import IsAuthenticated

# GET all notes & POST new note
@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def note_list(request):
    
    if request.method == 'GET':
        notes = Note.objects.filter(user=request.user)
        serializer = NoteSerializer(notes, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = NoteSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data)
        return Response(serializer.errors)

# UPDATE note
@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def note_update(request, pk):
    try:
        note = Note.objects.get(id=pk, user=request.user)
    except Note.DoesNotExist:
        return Response({"error": "Note not found"})

    serializer = NoteSerializer(note, data=request.data)

    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)

    return Response(serializer.errors)

# DELETE note
@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def note_delete(request, pk):
    try:
        note = Note.objects.get(id=pk, user=request.user)
    except Note.DoesNotExist:
        return Response({"error": "Note not found"})

    note.delete()
    return Response({"message": "Deleted successfully"})


@api_view(['POST'])
def register_user(request):
    serializer = RegisterSerializer(data=request.data)

    if serializer.is_valid():
        serializer.save()
        return Response(
            {"message": "User registered successfully"},
            status=201
        )

    return Response(serializer.errors, status=400)


@api_view(["POST"])
def login_user(request):
    username = request.data.get("username")
    password = request.data.get("password")

    user = authenticate(username=username, password=password)

    if user is not None:
        refresh = RefreshToken.for_user(user)

        return Response({
            "message": "Login successful",
            "refresh": str(refresh),
            "access": str(refresh.access_token),
        })

    return Response({"error": "Invalid username or password"}, status=401)