# 마스터 노드 정의
resource "aws_instance" "k8s_master" {
  ami                    = var.amimage # Ubuntu 22.04 LTS
  instance_type          = "t2.small"
  key_name               = var.keyname

  vpc_security_group_ids = [var.sg_id]
  subnet_id              = var.pubsntA_id # 퍼블릭 서브넷 ID
  associate_public_ip_address = true

  root_block_device {
    volume_size = 30
    volume_type = "gp2"
  }


  user_data = <<-EOF
    #!/bin/bash
    sudo timedatectl set-timezone Asia/Seoul
    sudo hostnamectl set-hostname master
    sudo snap install microk8s --classic
    sudo microk8s.status --wait-ready
    EOF

  connection {
    type        = "ssh"
    host        = self.public_ip
    user        = "ubuntu"
    port        = "22"
    private_key = file("/home/ubuntu/MyKeyPair03.pem")
  }

  tags = {
    Name = "k8s-master"
  }
}

# 워커 노드 정의
resource "aws_instance" "k8s_workers" {
  count                  = 3
  ami                    = var.amimage # Ubuntu 22.04 LTS
  instance_type          = "t2.small"
  key_name               = var.keyname
  vpc_security_group_ids = [var.sg_id]
  subnet_id              = var.pubsntA_id
  associate_public_ip_address = true
  root_block_device {
    volume_size = 30
    volume_type = "gp2"
  }


  user_data = <<-EOF
    #!/bin/bash
    sudo timedatectl set-timezone Asia/Seoul
    sudo hostnamectl set-hostname worker0${count.index + 1}
    sudo snap install microk8s --classic
    sudo microk8s.status --wait-ready
    EOF


   connection {
     type        = "ssh"
     host        = self.public_ip
     user        = "ubuntu"
     port        = "22"
     private_key = file("/home/ubuntu/MyKeyPair03.pem")
   }

  tags = {
    Name = "k8s-worker-${count.index}"
  }
}

output "master_public_ip" {
  value = aws_instance.k8s_master.public_ip
}


output "worker_public_ip" {
  value = aws_instance.k8s_workers[*].public_ip
}