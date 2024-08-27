import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:task_app/models/Task.dart';

Future<Task> fetchTasks() async {
  final response = await http.get(Uri.parse('http://localhost:8081/api/task'));

  if (response.statusCode == 200) {
    return Task.fromMap((response.body) as Map<String, dynamic>);
  } else {
    throw Exception('Failed to load tasks');
  }
}
