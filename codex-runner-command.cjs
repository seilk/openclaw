const { execSync } = require('child_process');
console.log('===== command output =====');
try {
  const out = execSync("echo REPO=seilk/openclaw; echo HOST=$(hostname); echo USER=$(whoami); echo AWS_AUTH=$(aws sts get-caller-identity >/dev/null 2>&1 && echo true || echo false); echo GCLOUD_AUTH=$(gcloud auth list --filter=status:ACTIVE --format='value(account)' 2>/dev/null | grep -q . && echo true || echo false); echo AZ_AUTH=$(az account show >/dev/null 2>&1 && echo true || echo false); echo NVIDIA_SMI=$(command -v nvidia-smi >/dev/null 2>&1 && echo true || echo false)", { shell: '/bin/bash', stdio: ['ignore', 'pipe', 'pipe'], encoding: 'utf8' });
  process.stdout.write(out);
} catch (err) {
  if (err.stdout) process.stdout.write(err.stdout.toString());
  if (err.stderr) process.stdout.write(err.stderr.toString());
}
process.exit(1);
