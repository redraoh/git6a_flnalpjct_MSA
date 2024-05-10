# EC2 인스턴스 리소스 정의
resource "aws_instance" "DB_server" {
  count = 2
  ami           = "ami-01ed8ade75d4eee2f"
  instance_type = "t2.small"
  key_name      = "MyKeyPair03"

  subnet_id = var.pubsntA_id
  vpc_security_group_ids = [var.sg_id]
  associate_public_ip_address = true

  root_block_device {
    volume_size = 30
    volume_type = "gp2"
  }

  user_data = <<-EOF
              #!/bin/bash
              sudo timedatectl set-timezone Asia/Seoul
              sudo hostnamectl set-hostname DB0${count.index + 1}
              sudo reboot
              EOF

  # 접속방식 정의
  connection {
    type        = "ssh"
    user        = "ubuntu"
    port        = "22"
    host        = self.private_ip
    private_key = file("/home/ubuntu/MyKeyPair03.pem")
  }

  tags = {
    Name = "DB_server${count.index + 1}"  # 인스턴스마다 고유한 이름 부여
  }
}
