require('child_process').spawnSync('npm run', ['build'], { stdio: 'inherit', cwd: 'client', shell: true });
