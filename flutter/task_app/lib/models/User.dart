class User {
  final String id;
  final String name;
  final String email;
  final String password;

  const User(this.id, this.password, {required this.name, required this.email});

}