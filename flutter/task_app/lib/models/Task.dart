class Task {
  final String id;
  final String title;
  final String description;
  final String isCompleted;
  final String createdAt;

  const Task(this.id, this.title, this.description, this.isCompleted, this.createdAt);

  Map<String, dynamic> toMap() {
    return {
      '_id': id,
      'title': title,
      'description': description,
      'isCompleted': isCompleted,
      'createdAt':createdAt

    };
  }

  static Task fromMap(Map<String, dynamic> map) {
    return Task(map['id'], map['title'], map['description'], map['isCompleted'], map['createdAt']);
  }
}
