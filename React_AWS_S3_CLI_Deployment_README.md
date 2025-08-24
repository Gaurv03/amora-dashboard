# 🚀 AWS CLI Deployment for React App

Perfect 🙌 now you’re asking the **DevOps way**: instead of manually creating S3 bucket + IAM user in AWS Console, let’s automate everything with **AWS CLI**.

I’ll give you:

1. A CLI command set (with explanations of each keyword).
2. An optional **bash script** (with comments inline).

---

## 1️⃣ AWS CLI Prerequisites

* Install AWS CLI → [docs](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html)
* Configure your account:

```bash
aws configure
```

It will ask for:

* `AWS Access Key ID`
* `AWS Secret Access Key`
* `Default region` (ex: `us-east-1`)
* `Default output format` (use `json` or leave blank)

---

## 2️⃣ Create S3 Bucket (via CLI)

```bash
aws s3api create-bucket   --bucket my-test-bucket-amora   --region us-east-1   --create-bucket-configuration LocationConstraint=us-east-1
```

🔎 Explanation:

* `aws s3api` → low-level S3 API commands.
* `create-bucket` → action to make a new bucket.
* `--bucket my-test-bucket-amora` → bucket name (must be globally unique).
* `--region us-east-1` → region where bucket will live.
* `--create-bucket-configuration LocationConstraint=us-east-1` → required for some regions (not `us-east-1`, but I added for consistency).

---

## 3️⃣ Make Bucket Public (for hosting)

```bash
aws s3 website s3://my-test-bucket-amora/ --index-document index.html --error-document index.html
```

🔎 Explanation:

* `aws s3 website` → turns bucket into a static website host.
* `--index-document` → file served at root (`index.html`).
* `--error-document` → file for 404s.

---

## 4️⃣ Create IAM User for GitHub Actions

```bash
aws iam create-user --user-name github-actions-deployer
```

🔎 Explanation:

* `aws iam` → Identity & Access Management.
* `create-user` → makes a new IAM user.
* `--user-name github-actions-deployer` → readable identifier for this user.

---

## 5️⃣ Attach Policy (Grant S3 Full Access)

```bash
aws iam attach-user-policy   --user-name github-actions-deployer   --policy-arn arn:aws:iam::aws:policy/AmazonS3FullAccess
```

🔎 Explanation:

* `attach-user-policy` → gives user permission.
* `--policy-arn arn:aws:iam::aws:policy/AmazonS3FullAccess` → AWS-managed policy that allows full S3 access.

*(⚠️ for real projects, you should create a custom policy with **only write access to 1 bucket**, but for learning, this is okay.)*

---

## 6️⃣ Create Access Keys (for GitHub Secrets)

```bash
aws iam create-access-key --user-name github-actions-deployer
```

This returns:

```json
{
  "AccessKey": {
    "AccessKeyId": "AKIA....",
    "SecretAccessKey": "abcd1234....",
    ...
  }
}
```

🔎 Explanation:

* These keys are what you’ll put into **GitHub Secrets** (`AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`).

---

## 7️⃣ Example Bash Script (Automated)

Here’s a script (`setup-s3-deployment.sh`) with comments:

```bash
#!/bin/bash
# -------------------------------
# Script to create S3 bucket + IAM user for GitHub Actions deploy
# -------------------------------

# Variables (edit these)
BUCKET_NAME="my-test-bucket-amora"
REGION="us-east-1"
IAM_USER="github-actions-deployer"

echo "🚀 Creating S3 bucket..."
aws s3api create-bucket   --bucket $BUCKET_NAME   --region $REGION   --create-bucket-configuration LocationConstraint=$REGION

echo "🌍 Enabling static website hosting..."
aws s3 website s3://$BUCKET_NAME/ --index-document index.html --error-document index.html

echo "👤 Creating IAM user..."
aws iam create-user --user-name $IAM_USER

echo "🔑 Attaching S3 policy..."
aws iam attach-user-policy   --user-name $IAM_USER   --policy-arn arn:aws:iam::aws:policy/AmazonS3FullAccess

echo "🔐 Generating access keys..."
aws iam create-access-key --user-name $IAM_USER
```

Run it:

```bash
bash setup-s3-deployment.sh
```

---

## 8️⃣ Next Step

* Copy `AccessKeyId` and `SecretAccessKey` from the output.
* Go to GitHub repo → **Settings → Secrets → Actions → New repository secret**.
* Add them as:

  * `AWS_ACCESS_KEY_ID`
  * `AWS_SECRET_ACCESS_KEY`

---

✅ At this point, your pipeline YAML will work end-to-end:

* Code push → GitHub builds React → Uploads to S3 → Hosted website 🎉

---

(Optional) You can create a **minimal custom IAM policy** that only allows **putObject + deleteObject** in your bucket for real-world security.
