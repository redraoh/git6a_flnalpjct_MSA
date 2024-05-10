output "public_ip" {
  value = aws_instance.DB_server[*].public_ip
}