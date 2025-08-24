# 🚀 React App Deployment on AWS S3

This guide explains **two ways** to deploy your React project to **AWS S3**:

1. **CI/CD Automation (GitHub Actions)** → Auto-deploy when pushing to `main`
2. **AWS CLI (Manual Deploy)** → Upload build files from your terminal

---

# 📌 1. CI/CD Deployment with GitHub Actions

Alright 🚀 let’s set up a **CI/CD pipeline** so that when you push your **React app** to the `main` branch, it automatically builds and deploys to **AWS S3**. I’ll give you **step-by-step** instructions with all the tools you need to install/configure.

---

## ✅ Step 1: Prerequisites

Make sure you have:

1. **AWS Account (Free Tier is fine)**
2. **React Project ready** (`npm run build` works locally)
3. Installed on your machine (for initial setup):
   * [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html)
   * Git
   * Node.js & npm
   * Your React project already on GitHub/Bitbucket

---

## ✅ Step 2: AWS Setup

### 1. Create an S3 bucket for hosting

* Go to **AWS S3 Console**
* Click **Create Bucket**
  * Name: `my-react-app-bucket` (must be unique globally)
  * Region: select one (e.g., `us-east-1`)
  * Disable "Block all public access"
* After creation → go to **Properties → Static website hosting**
  * Enable static website hosting
  * Set index document: `index.html`
  * (Optional) Set error document: `index.html` (for React Router)
* Copy the **bucket name** and **website endpoint URL**

---

### 2. Configure Bucket Policy (make it public)

* In **Permissions → Bucket Policy** paste:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::my-react-app-bucket/*"
    }
  ]
}
```

(Change `my-react-app-bucket` to your bucket name)

---

### 3. IAM User for Deployment

* Go to **IAM → Users → Add User**
  * Name: `react-deploy-user`
  * Permissions: Attach existing policy → **AmazonS3FullAccess**
* Download **Access Key ID** and **Secret Access Key**

---

## ✅ Step 3: AWS CLI Setup (Local)

Configure AWS credentials locally:

```bash
aws configure
```

Enter:

* Access Key ID
* Secret Key
* Default region: `us-east-1` (or your bucket region)
* Output: `json`

---

## ✅ Step 4: GitHub Actions for Deployment

In your React project:

1. Create a directory:

```bash
mkdir -p .github/workflows
```

2. Add a workflow file `.github/workflows/deploy.yml`

```yaml
name: Deploy React App to S3

on:
  push:
    branches:
      - main   # Trigger only on main branch

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout source code
        uses: actions/checkout@v3

      - name: Install dependencies
        run: npm install

      - name: Build React app
        run: npm run build

      - name: Verify Build Output
        run: ls -la dist # Please check if build folder name is /dist or /build

      - name: Deploy to S3
        uses: jakejarvis/s3-sync-action@v0.5.1
        with:
          args: --delete
        env:
          AWS_S3_BUCKET: ${{ secrets.AWS_S3_BUCKET }}
          AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
          AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          AWS_REGION: ${{ secrets.AWS_REGION }}
          SOURCE_DIR: dist # Please check if build folder name is /dist or /build

```

---

## ✅ Step 5: GitHub Secrets

1. Go to your repo on GitHub → **Settings → Secrets and variables → Actions**
2. Add:
   * `AWS_S3_BUCKET` = your S3 Bucket Name
   * `AWS_ACCESS_KEY_ID` = your IAM user access key
   * `AWS_SECRET_ACCESS_KEY` = your IAM user secret
   * (Optional) `AWS_REGION` = your bucket region

---

## ✅ Step 6: Test the Workflow

* Commit and push to `main` branch:

```bash
git add .
git commit -m "setup deployment"
git push origin main
```

* Go to GitHub → **Actions tab** → watch your deployment run
* After success, visit your **S3 website endpoint** (from bucket → properties → static hosting)

---

## 🎯 Final Workflow

* You code → `git push origin main`
* GitHub Actions builds React app
* Uploads `build/` files to S3
* You can access your live React site at:
  `http://<your-bucket-name>.s3-website-<region>.amazonaws.com`

⚡ (Optional but recommended later) → Add **CloudFront** in front of S3 for CDN + HTTPS.

---
