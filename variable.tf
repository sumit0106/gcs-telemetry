variable "aws_region" {
  default = "ap-south-1"
}

variable "ami_id" {
  description = "Ubuntu 22.04 LTS AMI ID (Mumbai region)"
  default     = "ami-0f918f7e67a3323f0"
}

variable "instance_type" {
  default = "t3.medium"
}

variable "key_name" {
  description = "Name for the AWS key pair"
  default     = "New"  # Replace with your key name in AWS
}

variable "public_key_path" {
  description = "Path to your public SSH key"
  default     = "~/Downloads/new.pub"  # Ensure you have this!
}
