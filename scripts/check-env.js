#!/usr/bin/env node

/**
 * Pre-Deployment Environment Variable Checker
 * 
 * Run this before deploying to verify all required environment variables are set.
 * Usage: node scripts/check-env.js
 */

const requiredEnvVars = [
  'VITE_VAPI_PUBLIC_KEY',
  'VITE_VAPI_ASSISTANT_HEALTHCARE',
  'VITE_VAPI_ASSISTANT_FINANCIAL',
  'VITE_VAPI_ASSISTANT_TRADES'
];

const optionalEnvVars = [
  'VITE_VAPI_BYPASS_EMAILS'
];

console.log('\n🔍 Checking environment variables...\n');

let allGood = true;
const missing = [];
const present = [];

// Check required variables
requiredEnvVars.forEach(varName => {
  if (process.env[varName]) {
    console.log(`✅ ${varName}: Set`);
    present.push(varName);
  } else {
    console.log(`❌ ${varName}: MISSING`);
    missing.push(varName);
    allGood = false;
  }
});

// Check optional variables
console.log('\nOptional variables:');
optionalEnvVars.forEach(varName => {
  if (process.env[varName]) {
    console.log(`✅ ${varName}: Set`);
  } else {
    console.log(`⚠️  ${varName}: Not set (optional)`);
  }
});

console.log('\n' + '='.repeat(50));

if (allGood) {
  console.log('✅ All required environment variables are set!');
  console.log('\nYou can proceed with deployment.');
  process.exit(0);
} else {
  console.log('❌ Missing required environment variables!');
  console.log('\nMissing variables:');
  missing.forEach(v => console.log(`  - ${v}`));
  console.log('\nTo fix:');
  console.log('1. Add missing variables to your .env file');
  console.log('2. Add them to Vercel: Project Settings → Environment Variables');
  console.log('3. Redeploy after adding variables');
  console.log('\nSee DEPLOYMENT.md for detailed instructions.');
  process.exit(1);
}
