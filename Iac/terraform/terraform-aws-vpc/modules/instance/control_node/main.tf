# EC2 인스턴스 리소스 정의
resource "aws_instance" "control_node" {
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

              # Set timezone and hostname
              sudo timedatectl set-timezone Asia/Seoul
              sudo hostnamectl set-hostname control-node

              # Add new user
              useradd -m -s /bin/bash clouds

              # Set password for the new user
              echo "clouds:clouds" | chpasswd

              # Grant sudo privileges to the new user
              echo "clouds ALL=(ALL) NOPASSWD:ALL" >> /etc/sudoers.d/clouds

              # Install Ansible
              sudo apt update
              sudo apt install -y software-properties-common
              sudo add-apt-repository --yes --update ppa:ansible/ansible
              sudo apt install -y ansible
              EOF

  # 접속방식 정의
  connection {
    type = "ssh"
    user = "ubuntu"
    port = "22"
    host = self.private_ip
    private_key = file("/home/ubuntu/MyKeyPair03.pem")
  }

  tags = {
    Name = "Control_node"
  }
}
